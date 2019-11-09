module Api
    class ApiController < ApplicationController
        def create_tag
            response = "error"
            status = :internal_server_error
            tag = Tag.where(name: params[:tag]).first()
            if (tag)
                b = Board.where(abrv: params[:board]).first()
                post = b.posts.where({post_num: params[:post_num]}).first()
                if (post)
                    post_tag = PostTag.where({tag: tag, post: post}).first()
                    response = "created"
                    status = :created
                    if (post_tag)
                        PostTag.update_counters post_tag.id, :count => params[:count].to_i
                    else
                        post_tag = PostTag.create(post: post, tag: tag, count: params[:count])
                    end
                    Resque.enqueue(TagBroadcast, params[:board], params[:post_num], params[:tag], post_tag.id)
                end
            end
            render json: {response: response}, status: status
        end
        def posts
            b = Board.where(abrv: params[:abrv]).first()
            post = b.posts.where({post_num: params[:num]}).first()
            ret = post ? 
            {abrv: params[:abrv], pid: params[:num], content: post.content, img_url: post.img.attached? ? url_for(post.img) : nil, replies: post.parent_replies.map {|reply| Post.find(reply.child_id).post_num}, tags: post.post_tags.map {|posttag| t = Tag.find(posttag.tag.id); {name: t.name, count: posttag.count}}} :
            {content: "Post does not exist"}
            render json: { data: ret }

        end
        def create_post
            img = params.has_key?(:img) ? params[:img] : nil
            b = Board.where(abrv: params[:board]).first()
            thr = b&.bthreads.where({post_num: params[:op]}).first()
            new_post = thr&.posts.new(content: params[:content], img: img, board: b, post_num: b.post_count)
            count = 0
            while (new_post && !new_post.valid? && new_post.errors.messages.has_key?(:post_num) && count < 5) do
                count += 1
                sleep 0.2
                b = Board.find(b.id)
                new_post.post_num = b.post_count
            end
            if (new_post&.save)
                Board.increment_counter(:post_count, b.id)
                BthreadChannel.broadcast_to(thr, {post_num: new_post.post_num})
                render json: { post: new_post.post_num }, status: :created
            else
                render json: {error: "Post not created"}, status: :internal_server_error
            end
        end
        def threads
            b = Board.where(abrv: params[:abrv]).first()
            tags = b&.tags.map {|tag| tag.name}
            post = b.posts.where({post_num: params[:num]}).first()
            bthread = Bthread.find(post.bthread.id)
            ret = {posts: [], tags: []}
            if (bthread)
                posts = bthread.posts.order(:created_at)
                if (params[:last])
                    po = [posts.first().post_num] + posts.last(3).map {|post| post.post_num}
                    ret = {posts: po.uniq}
                else
                    ret = {posts: posts.map {|post| post.post_num}, tags: tags}
                end
            end
            render json: { data: ret }
        end
        def create_thread
            payload = {error: "Thread could not get id"}
            status = :internal_server_error
            if (!params.has_key?(:img))
                payload = {error: "Thread needs image"}
                status = :bad_request
            else
                b = Board.where(abrv: params[:board]).first()
                new_post = b&.posts.new(content: params[:content], img: params[:img], post_num: b.post_count)
                count = 0
                while (new_post && !new_post.valid? && new_post.errors.messages.has_key?(:post_num) && count < 5) do
                    count += 1
                    sleep 0.2
                    b = Board.find(b.id)
                    new_post.post_num = b.post_count
                end
                if (new_post&.save)
                    thr = b.bthreads.create(post_num: new_post.post_num)
                    if (thr.persisted?)
                        new_post.bthread = thr
                        if new_post.save
                            Board.increment_counter(:post_count, b.id)
                            payload = { thread: thr.post_num }
                            status = :created
                            BoardChannel.broadcast_to(b, {post_num: thr.post_num})
                        else
                            new_post.destroy
                            thr.destroy
                            payload = {error: "Thread not created"}
                            status = :internal_server_error
                        end
                    else
                        new_post.destroy
                        payload = {error: "Thread not created"}
                        status = :internal_server_error
                    end
                end
            end
            render json: payload, status: status
        end
        def boards
            board = Board.where(abrv: params[:abrv]).first()
            ret = {thread: [], tags: []}
            if (board)
                ret = {threads: board.bthreads.order('updated_at DESC').map {|thread| thread.op_post.post_num},
                    tags: board.tags.order('updated_at DESC').map {|tag| tag.name}}
            end
            render json: { data: ret }
        end
        def index
            ret = Board.all.map {|b| {abrv: b.abrv, name: b.name}}
            render json: { data: {boards: ret} }
        end
    end
end
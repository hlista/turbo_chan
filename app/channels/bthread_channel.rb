class BthreadChannel < ApplicationCable::Channel

    def subscribed
        board = Board.where(abrv: params[:abrv]).first()
        post = board.posts.where(post_num: params[:post_num]).first()
        thr = Bthread.find(post.bthread.id)
        stream_for thr
    end
end
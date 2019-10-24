class TagChannel < ApplicationCable::Channel

    def subscribed
        stream_from "tags_#{params[:abrv]}_#{params[:post_num]}"
    end
end
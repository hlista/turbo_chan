class TagChannel < ApplicationCable::Channel

    def subscribed
        stream_from "tags_#{params[:abrv]}"
    end
end
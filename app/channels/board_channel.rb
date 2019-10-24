class BoardChannel < ApplicationCable::Channel

    def subscribed
        board = Board.where(abrv: params[:abrv]).first()
        stream_for board
    end
end
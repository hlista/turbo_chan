class TagBroadcast
    include Resque::Plugins::UniqueJob
    @queue = :tag

    def self.perform(abrv, post_num, name, ptid)
        post_tag = PostTag.find(ptid)
        ActionCable.server.broadcast("tags_#{abrv}", {pid: post_num, name: name, count: post_tag.count})
    end

end
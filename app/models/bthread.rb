class Bthread < ApplicationRecord
  belongs_to :board
  has_many :posts
  def tail
    posts.order(:created_at).last(3).map {|post| post.post_num}
  end
end

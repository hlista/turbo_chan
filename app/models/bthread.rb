class Bthread < ApplicationRecord
  belongs_to :board
  has_many :posts
  def tail_posts
    posts.order(:created_at).last(3)
  end
  def op_post
    posts.order(:created_at).first
  end
end

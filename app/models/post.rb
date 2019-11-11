class Post < ApplicationRecord
    belongs_to :bthread, required: false
    belongs_to :board
    has_many :post_tags
    has_many :tags, through: :post_tags
    has_many :parent_replies, :class_name => 'Reply', :foreign_key => 'parent_id'
    has_many :child_replies, :class_name => 'Reply', :foreign_key => 'child_id'
    has_one_attached :img
    validates_uniqueness_of :post_num, scope: :board_id
    validates_length_of :content, :maximum => 2000
end

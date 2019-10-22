class Board < ApplicationRecord
    has_many :bthreads
    has_many :posts
    has_many :board_tags
    has_many :tags, through: :board_tags
    validates_uniqueness_of :abrv
end

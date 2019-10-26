class UniqueConstraints < ActiveRecord::Migration[6.0]
  def change
    add_index :post_tags, [:tag_id, :post_id], :unique => true
    add_index :board_tags, [:board_id, :tag_id], :unique => true
    add_index :replies, [:parent_id, :child_id], :unique => true
  end
end

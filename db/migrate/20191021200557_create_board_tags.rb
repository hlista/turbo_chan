class CreateBoardTags < ActiveRecord::Migration[6.0]
  def change
    create_table :board_tags do |t|
      t.belongs_to :tag, null: false, foreign_key: true
      t.belongs_to :board, null: false, foreign_key: true

      t.timestamps
    end
  end
end

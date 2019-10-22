class CreateBoards < ActiveRecord::Migration[6.0]
  def change
    create_table :boards do |t|
      t.string :name, :null => false
      t.string :abrv, :null => false
      t.integer :post_count, :null => false, :default => 1
      t.timestamps
    end
    add_index :boards, :abrv, unique: true
  end
end

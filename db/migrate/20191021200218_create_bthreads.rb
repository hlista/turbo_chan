class CreateBthreads < ActiveRecord::Migration[6.0]
  def change
    create_table :bthreads do |t|
      t.belongs_to :board, null: false, foreign_key: true
      t.integer :post_num, null: false
      t.string :subject
      t.timestamps
    end
  end
end

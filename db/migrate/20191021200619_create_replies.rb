class CreateReplies < ActiveRecord::Migration[6.0]
  def change
    create_table :replies do |t|
      t.references :parent, null: false
      t.references :child, null: false

      t.timestamps
    end
  end
end


class CreateListItems < ActiveRecord::Migration
  def change
    create_table :list_items do |t|
      t.string :title
      t.string :description
      t.integer :rank
      t.belongs_to :list, index: true

      t.timestamps
    end
  end
end

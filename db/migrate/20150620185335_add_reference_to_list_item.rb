class AddReferenceToListItem < ActiveRecord::Migration
  def change
    add_column :list_items, :list_id, :integer
  end
end

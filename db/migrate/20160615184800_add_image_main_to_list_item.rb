class AddImageMainToListItem < ActiveRecord::Migration
  def self.up
    add_attachment :list_items, :image_main
  end

  def self.down
    remove_attachment :list_items, :image_main
  end
end

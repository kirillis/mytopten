class AddCachedTotalVotesToLists < ActiveRecord::Migration
  def change
    add_column :lists, :cached_votes_total, :integer, default: 0
  end
end

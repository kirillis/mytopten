class ListItem < ActiveRecord::Base
  belongs_to :list
  default_scope { order(:rank) }
end

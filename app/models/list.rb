class List < ActiveRecord::Base
  acts_as_taggable
  has_many :list_items, dependent: :delete_all
  belongs_to :user
end

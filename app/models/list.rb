class List < ActiveRecord::Base
  acts_as_taggable
  acts_as_votable
  has_many :list_items, dependent: :delete_all
  belongs_to :user
end

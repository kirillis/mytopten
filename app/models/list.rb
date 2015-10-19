class List < ActiveRecord::Base
  has_many :list_items, dependent: :delete_all
  belongs_to :user
end

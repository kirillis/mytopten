class ListSerializer < ActiveModel::Serializer
  # embed :ids, include: true
  attributes :id, :title, :description, :public
  has_one :user
  has_many :list_items
end

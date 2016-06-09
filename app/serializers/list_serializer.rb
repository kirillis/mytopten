class ListSerializer < ActiveModel::Serializer
  # embed :ids, include: true
  attributes :id, :title, :description, :public, :tags, :tag_list
  has_one :user
  has_many :list_items
end

class ListSerializer < ActiveModel::Serializer
  include ActionView::Helpers::DateHelper
  # embed :ids, include: true
  attributes  :id,
              :title,
              :description,
              :public,
              :created_at,
              :updated_at,
              :tags,
              :tag_list
  has_one :user
  has_many :list_items

  attribute :created_at do
    time_ago_in_words(object.created_at)
  end

  attribute :updated_at do
    time_ago_in_words(object.updated_at)
  end
end

class List < ActiveRecord::Base
  acts_as_taggable
  acts_as_votable
  has_many :list_items, dependent: :delete_all
  belongs_to :user
  validates :title, presence: true

  scope :published, -> { where(public: true) }
  scope :min_items, -> { where("list_items_count >= 3") }

  def self.search(search)
    downcase_search_query = search.downcase
    published.min_items.where("LOWER(title) LIKE '%#{downcase_search_query}%' OR LOWER(description) LIKE '%#{downcase_search_query}%'")
  end
end

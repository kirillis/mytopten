class HomeController < ApplicationController

  def show
    @tags = ActsAsTaggableOn::Tag.most_used(20)
    @lists = List
      .published
      .order(cached_votes_total: :desc)
      .includes(:user, :list_items, :tags)
      .limit(50)
  end

end

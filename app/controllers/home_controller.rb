class HomeController < ApplicationController

  def show
    @tags = ActsAsTaggableOn::Tag.most_used(20)
    @lists = List
      .published
      .min_items
      .order(cached_votes_total: :desc)
      .includes(:user, :list_items, :tags)
      .page params[:page]

    @timeframe = 'alltime'
    render "lists/popular"
  end

end

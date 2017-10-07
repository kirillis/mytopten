class TagsController < ApplicationController
  def index
    @tags = ActsAsTaggableOn::Tag.all.order(name: :asc)
    respond_to do |format|
      format.json { render json: @tags }
    end
  end

  def search
    @tags = ActsAsTaggableOn::Tag.where("name like ?", "%#{params[:tag_query]}%")
    respond_to do |format|
      format.html
      format.json {
        render json: @tags, root: false
      }
    end
  end

  def filter
    @all_tags = ActsAsTaggableOn::Tag.all.order(name: :asc)
    if params.key?('tags')
      @tags = Array.new(params[:tags].split(/,/))
      @lists = List
        .published
        .order(cached_votes_total: :desc)
        .tagged_with(@tags)
        .includes(:user, :list_items)
    else
      @lists = []
    end
  end
end

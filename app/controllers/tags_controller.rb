class TagsController < ApplicationController
  def index
    @tags = ActsAsTaggableOn::Tag.all
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

  def show
    @tag_name = params[:tag_name]
    @lists = List.tagged_with(@tag_name).includes(:user, :list_items)
  end
end

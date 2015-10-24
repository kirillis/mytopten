class TagsController < ApplicationController
  def index
    @tags = ActsAsTaggableOn::Tag.all
  end

  def show
    @tag_name = params[:tag_name]
    @lists = List.tagged_with(@tag_name)
  end
end

class ListsController < ApplicationController
  before_filter :require_login, only: [:edit, :create, :destroy]

  def index
    @user = User.find_by(name: params[:user_name])
    if @user
      @lists = @user.lists
      @new_list = List.new
      respond_to do |format|
        format.html
        format.json { render json: @lists }
      end
    else
      flash[:error] = "No user found with the name: #{params[:user_name]}."
      redirect_to root_path
    end
  end

  def newest
    @tags = ActsAsTaggableOn::Tag.most_used(20)
    @lists = List
      .includes(:user, :list_items, :tags)
      .order(created_at: :desc)
      .page params[:page]
    render "lists/newest"
  end

  def popular_timeframe
    @tags = ActsAsTaggableOn::Tag.most_used(20)
    @timeframe = params[:timeframe]
    if @timeframe == 'alltime'
      @lists = List
        .published
        .min_items
        .order(cached_votes_total: :desc)
        .includes(:user, :list_items, :tags)
        .page params[:page]
    else
      @lists = List
        .published
        .min_items
        .where('created_at >= ?', 1.public_send(@timeframe).ago)
        .order(cached_votes_total: :desc)
        .includes(:user, :list_items, :tags)
        .page params[:page]
    end
    render "lists/popular"
  end

  def show
    @tags = ActsAsTaggableOn::Tag.most_used(10)
    @user = User.find_by(name: params[:user_name])
    if @user
      @list = @user.lists.find_by(id: params[:list_id])
    else
      redirect_to root_path, alert: "No such user found."
    end

    @related_lists = @list
      .find_related_tags

    @lists = List
      .includes(:user, :list_items, :tags)
      .order(cached_votes_total: :desc)
      .limit(10)

    if !@list.public and current_user != @user
      redirect_to root_path, alert: "Nothing to see here."
    end
  end

  def toggle_like
    list = List.find_by(id: params[:list_id])
    if list and current_user
      if current_user.voted_up_on? list
        list.unliked_by current_user
        liked_status = false
      else
        current_user.likes list
        liked_status = true
      end
      payload = { liked: liked_status }
      status = 200
    else
      status = 500
      payload = { error: 'User or list not found.' }
    end

    sleep 0.5
    render json: payload, status: status
  end

  def edit
    @user = User.find_by(name: params[:user_name])
    if current_user != @user
      redirect_to user_list_path(@user.name, params[:list_id]), alert: "You are not authorized to edit this list."
      return
    end

    if @user
      @user_name = @user.name
      @list = @user.lists.find(params[:list_id])
      @list_id = params[:list_id]
      respond_to do |format|
        format.html
        format.json {
          render json: @list, root: false
        }
      end
    else
      respond_to do |format|
        format.html
        format.json {
          render :json => { :errors => 'No user with the name "#{params[:user_name]}" was found.' }, :status => 422
        }
      end
    end
  end

  def new
    @list = List.new
  end

  def create
    @list = current_user.lists.new(list_params)
    if @list.save
      redirect_to user_list_edit_path(list_id: @list.id, user_name: current_user.name)
    else
      flash[:error] = 'These fields are required.'
      render 'new'
    end
  end

  def update
    @list = List.find(params[:id])
    @list.update(list_params)
    @list.tag_list.add(params[:tags], parse: true)

    if @list.save
      render json: @list
    else
      render :json => { :errors => 'No list with that id found.' }, :status => 422
    end
  end

  def update_tags
    list = List.find(params[:list_id])

    list.tag_list.add(params[:newTag], parse: true)
    if list.save
      render json: list
    else
      render :json => { :errors => 'Error saving new tags for list.' }, :status => 422
    end
  end

  def remove_tag
    list = List.find(params[:list_id])

    list.tag_list.remove(params[:tagToRemove])
    if list.save
      render json: list
    else
      render :json => { :errors => 'Error saving new tags for list.' }, :status => 422
    end
  end

  def destroy
    if List.find(params[:list_id]).destroy
      redirect_to user_path(current_user.name), info: 'List deleted.'
    else
      redirect_to user_path(current_user.name), info: 'Error: List not deleted.'
    end
  end

  private
    def list_params
      params.require(:list).permit(:title, :description, :public, :tags, list_items_attributes: [:title, :description])
    end
end

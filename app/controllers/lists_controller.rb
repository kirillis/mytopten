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

  def show
    @user = User.find_by(name: params[:user_name])
    if @user
      @list = @user.lists.find_by(id: params[:list_id])
    else
      redirect_to root_path, alert: "No such user found."
    end

    if !@list.public and current_user != @user
      redirect_to root_path, alert: "Nothing to see here."
    end
  end

  def toggle_like
    list = List.find_by(id: params[:list_id])
    if list and current_user
      if current_user.voted_up_on? list
        current_user.dislikes list
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
    @new_list = List.new
  end

  def create
    @list = current_user.lists.create(list_params)
    @list.save
    redirect_to user_list_path(@list.user.name, @list)
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
      redirect_to user_lists_path(current_user.name), notice: 'List deleted.'
    else
      redirect_to user_lists_path(current_user.name), notice: 'Error: List not deleted.'
    end
  end

  private
    def list_params
      params.require(:list).permit(:title, :description, :public, :tags, list_items_attributes: [:title, :description])
    end
end

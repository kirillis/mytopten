class ListsController < ApplicationController
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
    if @list.save
      render json: @list
    else
      render :json => { :errors => 'No list with that id found.' }, :status => 422
    end
  end

  private
    def list_params
      params.require(:list).permit(:title, :description, list_items_attributes: [:title, :description])
    end
end

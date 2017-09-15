Mytopten::Application.routes.draw do

  # ROOT
  root 'home#show'

  # TAGS
  get 'tags', to: 'tags#index', as: 'tags'
  get 'tags/:tag_name', to: 'tags#show', as: 'tag'
  get 'tags/search/:tag_query', to: 'tags#search', as: 'tags_search'
  delete 'lists/:list_id/tag', to: 'lists#remove_tag', as: 'list_tag_remove'
  put 'lists/:list_id/tags', to: 'lists#update_tags', as: 'list_tags_update'

  # SEARCH
  get 'search/', to: 'search#show', as: 'search_site'
  get 'search/site', to: 'search#site', as: 'search_site_results'
  get 'api/search/amazon', to: 'search#amazon', as: 'search_amazon'

  # SESSIONS
  resources :sessions, only: [:new, :create]
  get 'login', to: 'sessions#new', as: 'user_log_in'
  delete 'logout', to: 'sessions#destroy', as: 'user_log_out'

  # USERS
  get 'register', to: 'users#new', as: 'user_register'
  get ':name', to: 'users#show', as: 'user'
  post :users, to: 'users#create'

  # PASSWORD
  post 'password_resets/create', as: 'password_resets'
  get 'password_resets/edit'
  get 'password_resets/update'
  resources :password_resets

  # LISTS
  resources :lists, only: [:create, :update]
  get 'lists/newest', tp: 'lists#newest', as: 'lists_newest'
  get 'lists/popular/:timeframe', to: 'lists#popular_timeframe', as: 'lists_popular_timeframe'
  get ':user_name/lists', to: 'lists#index', as: 'user_lists'
  get ':user_name/lists/new', to: 'lists#new', as: 'user_list_new'
  get ':user_name/lists/:list_id', to: 'lists#show', as: 'user_list'
  get ':user_name/lists/:list_id/edit', to: 'lists#edit', as: 'user_list_edit'
  delete ':user_name/lists/:list_id', to: 'lists#destroy', as: 'user_list_destroy'
  get 'lists/:list_id/toggle_like', to: 'lists#toggle_like', as: 'list_toggle_like'

  # LISTITEMS
  resources :list_items, only: [:create, :update, :destroy, :edit]
  put 'list_items/:id/:new_rank', to: 'list_items#change_rank'

end

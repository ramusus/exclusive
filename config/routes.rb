Project::Application.routes.draw do

  mount Ckeditor::Engine => '/ckeditor'
  mount RailsAdmin::Engine => '/admin', :as => 'rails_admin'
  devise_for :users

  match "/team/" => "application#team"
  match "/:slug/" => "pages#show"

  root :to => 'application#index'

end

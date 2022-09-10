Rails.application.routes.draw do
  get 'facts/show'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'maps#index'

  resources :states, only: [:show]
  resources :facts, only: [:show]
end

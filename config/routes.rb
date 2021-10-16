Rails.application.routes.draw do
  mount RocketJobMissionControl::Engine => 'rocketjob'
  
  get 'facts/show'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'home#index'

  resources :states, only: [:show]
  resources :facts, only: [:show]
end

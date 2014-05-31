DropzoneJsWithRails4::Application.routes.draw do
  resources :homes, :only => [:index] do
    post :add_image, :on => :collection
    get :remove_image, :on => :collection
  end  
end

class UsersController < ApplicationController
    skip_before_action :is_authorized?, except: [:create], raise: false
    before_action :is_admin?, only: [:update, :destroy]

     
     def index 
        render json: User.all
    end 

  
    def show        
        user = User.find_by(id: session[:current_user])
            if user
                render json: current_user, status: :ok
            else
                render json: "No current session stored", status: :unauthorized
            end
    end
    
    
    def create
       

        user = User.create!(user_params)
        session[:current_user] = user.id
        render json: user, status: :created
    end

    
    def update
        user = User.find(params[:id])
        user.update!(user_params)
        render json: user, status: :created
    end

    
    def destroy
        user = User.find(params[:id])
        user.destroy
        head :no_content
    end

    private

    def user_params
        params.permit(:name, :admin, :password)
    end
end

class UsersController < ApplicationController

     # GET "/users"
     def index 
        render json: User.all
    end 

    # GET "/users/:id"
    def show
        user = User.find(params[:id])
            if user
                render json: user, status: :ok
            else
                render json: "No current session stored", status: :unauthorized
            end
    end
    
    # POST "/users"
    def create
        # byebug

        user = User.create!(user_params)
        session[:current_user] = user.id
        render json: user, status: :created
    end

    # PUT "/users/:id"
    def update
        user = User.find(params[:id])
        user.update!(user_params)
        render json: user, status: :created
    end

    # DELETE "/users/:id"
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

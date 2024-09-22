<?php

namespace App\Http\Requests;

use Illuminate\Container\Attributes\Auth;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth as FacadesAuth;

class StoreAuctionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return FacadesAuth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "product_name" => "required|string",
            "product_description" => "required|string",
            "starting_price" => "required|numeric",
            "joining_fee" => "required|numeric",
            "start_time" => "required|date",
            "end_time" => "required|date",
        ];
    }
}

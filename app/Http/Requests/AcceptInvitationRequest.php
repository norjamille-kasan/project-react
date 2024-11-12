<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;

class AcceptInvitationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            //
        ];
    }

    public function ensureInvitationIsForCurrentUser(string $invitedEmail): User
    {
        $invitedUser = User::whereEmail($invitedEmail)->first();
        abort_unless($this->user()->is($invitedUser),403,"Please log in with the same invited email");
        
        return $invitedUser;
    }

}

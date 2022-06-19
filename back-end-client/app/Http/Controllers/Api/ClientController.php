<?php

namespace App\Http\Controllers\Api;

use App\Models\Client;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ClientController extends Controller
{
    public function index()
    {
        $clients = Client::all();
        return response()->json([
            'status'=> 200,
            'clients'=>$clients,
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'name'=>'required|max:250',
            'direction'=>'required|max:191',
            'city'=>'required|max:191',
            
        ]);

        if($validator->fails())
        {
            return response()->json([
                'status'=> 422,
                'validate_err'=> $validator->messages(),
            ]);
        }
        else
        {
            $client = new Client;
            $client->name = $request->input('name');
            $client->direction = $request->input('direction');
            $client->city = $request->input('city');
            $client->save();

            return response()->json([
                'status'=> 200,
                'message'=>'Student Added Successfully',
            ]);
        }

    }

    public function edit($id)
    {
        $client = Client::find($id);
        if($client)
        {
            return response()->json([
                'status'=> 200,
                'client' => $client,
            ]);
        }
        else
        {
            return response()->json([
                'status'=> 404,
                'message' => 'No Client ID Found',
            ]);
        }

    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(),[
            'name'=>'required|max:250',
            'direction'=>'required|max:191',
            'city'=>'required|max:191',
        ]);

        if($validator->fails())
        {
            return response()->json([
                'status'=> 422,
                'validationErrors'=> $validator->messages(),
            ]);
        }
        else
        {
            $client = Client::find($id);
            if($client)
            {

                $client->name = $request->input('name');
                $client->direction = $request->input('direction');
                $client->city = $request->input('city');
                $client->update();

                return response()->json([
                    'status'=> 200,
                    'message'=>'Client Updated Successfully',
                ]);
            }
            else
            {
                return response()->json([
                    'status'=> 404,
                    'message' => 'No Client ID Found',
                ]);
            }
        }
    }

    public function destroy($id)
    {
        $client = Client::find($id);
        if($client)
        {
            $client->delete();
            return response()->json([
                'status'=> 200,
                'message'=>'Client Deleted Successfully',
            ]);
        }
        else
        {
            return response()->json([
                'status'=> 404,
                'message' => 'No Client ID Found',
            ]);
        }
    }
}

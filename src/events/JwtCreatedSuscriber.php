<?php

namespace App\events;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class JwtCreatedSuscriber{

    public function updateJwtData(JWTCreatedEvent $event){

        //recup le user
        $user = $event->getUser();


        //enrichir les datas
        $data = $event->getData();
        $data['firstName'] = $user->getFirstName();
        $data['lastName'] = $user->getLastName();


        $event->setData($data);

    }

}
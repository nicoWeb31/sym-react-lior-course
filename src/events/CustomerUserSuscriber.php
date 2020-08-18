<?php

namespace App\events;

use App\Entity\Customer;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Core\EventListener\EventPriorities;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class CustomerUserSuscriber implements EventSubscriberInterface

{
    /**
     * Undocumented variable
     *
     * @var Security
     */
    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }


    public static function getSubscribedEvents()
    {
        return [

            KernelEvents::VIEW => ['setUserforCustomer', EventPriorities::PRE_VALIDATE] 

        ];
    }

    public function setUserforCustomer(ViewEvent $event){

        $customer = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if($customer instanceof Customer && $method === "POST"){
            
            //chopper l'uttilisateur connecté

            $user = $this->security->getUser();

            //l'assigner au nouveau customer

            $customer->setUser($user);

        }





    }


}
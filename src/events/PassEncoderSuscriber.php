<?php

namespace App\events;

use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\User;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class PassEncoderSuscriber implements EventSubscriberInterface

{

    /**
     * Undocumented variable
     *
     * @var UserPasswordEncoderInterface
     */
    private $encode;

    public function __construct(UserPasswordEncoderInterface $encode)
    {
        $this->encode = $encode;
    }

    public static function getSubscribedEvents(){

        return [
            KernelEvents::VIEW => ['encodePassword', EventPriorities::PRE_WRITE]
        ];
    }

    public function encodePassword(ViewEvent $event){

        $user = $event->getControllerResult();
        
        $method = $event->getRequest()->getMethod();

        if($user instanceof User && $method === "POST"){
            $hash = $this->encode->encodePassword($user,$user->getPassword());
            $user->setPassword($hash);
        }

    }

}
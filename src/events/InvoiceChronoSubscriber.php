<?php

namespace App\events;

use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Invoice;
use App\Repository\InvoiceRepository;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;


class InvoiceChronoSubscriber implements EventSubscriberInterface

{

    /**
     * Undocumented variable
     *
     * @var Security
     */
    private $security;

    /**
     * Undocumented variable
     *
     * @var InvoiceRepository
     */
    private $repo;

    public function __construct(Security $security,InvoiceRepository $repo)
    {
        $this->security = $security;
        $this->repo = $repo;
    }

    public static function getSubscribedEvents()
    {
        return [

            KernelEvents::VIEW => ['setChronoForInvoice', EventPriorities::PRE_VALIDATE] 

        ];
    }

    public function setChronoForInvoice(ViewEvent $event){

        //le invoice
        $invoices = $event->getControllerResult();
        //la methode
        $method = $event->getRequest()->getMethod();
        
        if($invoices instanceof Invoice && $method === "POST"){
            //l'utilisateur connecté
            $user=$this->security->getUser();
            $lastChrono = $this->repo->findLastChrono($user);

            $invoices->setChrono((int)$lastChrono + 1);

            //todo que je ferai jamais : a deplacer dans une classe dedié

            if(empty($invoices->getSentAt())) $invoices->setSentAt(new \DateTime());
        

        }



    }


}
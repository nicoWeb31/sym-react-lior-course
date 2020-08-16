<?php

namespace App\Controller;

use App\Entity\Invoice;
use Doctrine\ORM\EntityManagerInterface;

class InvoicesIncrementationController
{



    
    public function __invoke(Invoice $data, EntityManagerInterface $man)
    {
        $data->setChrono($data->getChrono() + 1);
        $man->persist($data);
        $man->flush();
        return $data;
    }

}
<?php


namespace App\doctrine;

use Doctrine\ORM\QueryBuilder;
use Symfony\Component\Security\Core\Security;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryItemExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;
use App\Entity\Customer;
use App\Entity\Invoice;

class CurrentUserExtension implements QueryCollectionExtensionInterface, QueryItemExtensionInterface

{

    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }


    private function addWhere(QueryBuilder $queryBuilder, string $resourceClass){

        //obtenir l'utilisateur connecté
        $user =$this->security->getUser();

        //si on demande des invoice ou des customer tenir compte de l'utilisateur connecté
        if($resourceClass === Customer::class || $resourceClass === Invoice::class){
            $rootAlias = $queryBuilder->getRootAliases()[0];


            if($resourceClass === Customer::class){
            
                $queryBuilder->andWhere("$rootAlias.user = :user");
            


            }elseif($resourceClass === Invoice::class){
                $queryBuilder->join("$rootAlias.customer","c")
                            ->andWhere("c.user= :user");
                            


            }
            $queryBuilder->setParameter(":user",$user);



        }

    }

    public function applyToCollection(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, ?string $operationName = null)
    {
        $this->addWhere($queryBuilder,$resourceClass);
    }


    public function applyToItem(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, array $identifiers, ?string $operationName = null, array $context = [])
    {
        $this->addWhere($queryBuilder,$resourceClass);
    }



}
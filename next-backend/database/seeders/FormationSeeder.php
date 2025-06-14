<?php 

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class FormationSeeder extends Seeder
{
    public function run()
    {
        DB::table('formations')->insert([
            [
                'name'=> 'Développement Web Frontend',
                'prerequisites' => 'Notions de base en informatique',
                'price' => 50000,
                'formation_details' => 'Apprenez à créer des sites web modernes avec HTML5, CSS3, JavaScript, Bootstrap et Tailwind CSS.',
                'picture' => 'images/formations/frontend.jpg',
                'user_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name'=> 'Développement Web Backend avec Laravel',
                'prerequisites' => 'Bases en PHP et MySQL',
                'price' => 75000,
                'formation_details' => 'Maîtrisez Laravel pour créer des applications web sécurisées avec Eloquent, les migrations, les API RESTful et l’authentification.',
                'picture' => 'images/formations/backend.jpg',
                'user_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name'=> 'Graphisme & Design UI/UX',
                'prerequisites' => 'Créativité et esprit artistique',
                'price' => 65000,
                'formation_details' => 'Découvrez le design d’interface avec Figma, les principes UI/UX, la création de maquettes et l’expérience utilisateur.',
                'picture' => 'images/formations/design.jpg',
                'user_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name'=> 'Photographie et Retouche d’image',
                'prerequisites' => 'Aucune expérience requise',
                'price' => 40000,
                'formation_details' => 'Initiez-vous à la photographie numérique et à la retouche photo avec Photoshop et Lightroom.',
                'picture' => 'images/formations/photo.jpg',
                'user_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name'=> 'Marketing Digital',
                'prerequisites' => 'Connaissance basique de l’internet',
                'price' => 60000,
                'formation_details' => 'Apprenez les bases du marketing digital, du SEO, du marketing de contenu, des réseaux sociaux et du copywriting.',
                'picture' => 'images/formations/marketing.jpg',
                'user_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name'=> 'Initiation à la programmation',
                'prerequisites' => 'Aucun',
                'price' => 30000,
                'formation_details' => 'Formation pour débutants : algorithmes de base, Python, logique de programmation.',
                'picture' => 'images/formations/initiation.jpg',
                'user_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name'=> 'Développement Mobile avec Flutter',
                'prerequisites' => 'Bonne maîtrise de la logique de programmation',
                'price' => 80000,
                'formation_details' => 'Créez des applications mobiles performantes pour Android et iOS avec Flutter et Dart.',
                'picture' => 'images/formations/flutter.jpg',
                'user_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name'=> 'Cybersécurité de base',
                'prerequisites' => 'Utilisation courante de l’ordinateur',
                'price' => 70000,
                'formation_details' => 'Comprenez les bases de la sécurité informatique : antivirus, phishing, mots de passe, VPN, etc.',
                'picture' => 'images/formations/cyber.jpg',
                'user_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name'=> 'Bureautique (Word, Excel, PowerPoint)',
                'prerequisites' => 'Utilisation de base d’un ordinateur',
                'price' => 25000,
                'formation_details' => 'Formation complète pour maîtriser les logiciels bureautiques indispensables pour le travail ou les études.',
                'picture' => 'images/formations/bureautique.jpg',
                'user_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name'=> 'Création de contenu & Réseaux sociaux',
                'prerequisites' => 'Utilisation de Facebook ou Instagram',
                'price' => 55000,
                'formation_details' => 'Apprenez à produire du contenu viral, gérer une page, utiliser Canva et automatiser la publication.',
                'picture' => 'images/formations/social.jpg',
                'user_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}

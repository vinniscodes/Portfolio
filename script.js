document.addEventListener('DOMContentLoaded', () => {
    const githubUsername = 'vinniscode'; // 
    const projectsContainer = document.getElementById('projects-feed');


    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#00bcd4" 
            },
            "shape": {
                "type": "circle", 
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#00bcd4", 
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 6,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push" 
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });


 
    if (!githubUsername || !projectsContainer) {
        console.error('Verifique se o nome de usuário do GitHub está configurado e se o contêiner de projetos existe.');
        return;
    }

    fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=9`)
        .then(response => {
            if (!response.ok) {
                if (response.status === 403) {
                    throw new Error('Erro 403: Limite de requisições da API do GitHub atingido. Tente novamente mais tarde.');
                }
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(repos => {
            const filteredRepos = repos.filter(repo =>
                !repo.fork &&
                !repo.private &&
                repo.description
            );

            if (filteredRepos.length === 0) {
                projectsContainer.innerHTML = '<p>Nenhum projeto público relevante encontrado no GitHub.</p>';
                return;
            }

            filteredRepos.forEach(repo => {
                const projectCard = document.createElement('div');
                projectCard.classList.add('project-card');

                const projectName = repo.name.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

                const technologies = [];
                if (repo.language) {
                    technologies.push(repo.language);
                }
                if (repo.topics && Array.isArray(repo.topics)) {
                    repo.topics.forEach(topic => {
                        if (!technologies.includes(topic)) {
                            technologies.push(topic);
                        }
                    });
                }

                const techTagsHtml = technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('');

                projectCard.innerHTML = `
                    <h3>${projectName}</h3>
                    <p>${repo.description}</p>
                    <div class="project-techs">
                        ${techTagsHtml}
                    </div>
                    <div class="project-links">
                        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">Ver no GitHub</a>
                        ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" rel="noopener noreferrer">Ver Demo</a>` : ''}
                    </div>
                `;
                projectsContainer.appendChild(projectCard);
            });
        })
        .catch(error => {
            console.error('Erro ao buscar repositórios do GitHub:', error);
            projectsContainer.innerHTML = `<p>${error.message || 'Erro ao carregar os projetos. Tente novamente mais tarde.'}</p>`;
        });
});
// Olá Curioso, Não sei porque você está olhando o codigo masss... SEJA BEM VINDO, MEU NOME È VINICIUS ANDERSON E EU ESCREVI ISSO.-->

using Application.Interfaces;
using Application.Services;
using WebAPI.MockFactory.Tests.Factory.Interfaces;

namespace WebAPI.MockFactory.Tests.Factory
{
    public class ServiceFactory : IServiceFactory
    {
        private readonly IRepositoryFactory _repositoryFactory;

        public ServiceFactory(IRepositoryFactory repositoryFactory)
        {
            _repositoryFactory = repositoryFactory;
        }

        public IPositionService CreatePositionService()
        {
            return new PositionService(_repositoryFactory.CreatePositionRepository());
        }
    }
}

//using CleanArchitecture.Infra.Data.Repositories;
using Infrastructure.Repositories;
using WebAPI.MockFactory.Tests.Factory.Interfaces;

namespace WebAPI.MockFactory.Tests.Factory
{
    public class RepositoryFactory : IRepositoryFactory
    {
        private readonly IRepositoryContextFactory _repositoryContextFactory;

        public RepositoryFactory(IRepositoryContextFactory repositoryContextFactory)
        {
            _repositoryContextFactory = repositoryContextFactory;
        }

        public PositionRepository CreatePositionRepository()
        {
            return new PositionRepository(_repositoryContextFactory.CreateDatabaseContext());
        }
    }
}
